FROM mcr.microsoft.com/dotnet/core/sdk:3.1-bionic AS build
WORKDIR /src
COPY ["aspnet-core/src/Aqua.TestPlatform.Web.Host/Aqua.TestPlatform.Web.Host.csproj", "src/Aqua.TestPlatform.Web.Host/"]
COPY ["aspnet-core/src/Aqua.TestPlatform.Web.Core/Aqua.TestPlatform.Web.Core.csproj", "src/Aqua.TestPlatform.Web.Core/"]
COPY ["aspnet-core/src/Aqua.TestPlatform.EntityFrameworkCore/Aqua.TestPlatform.EntityFrameworkCore.csproj", "src/Aqua.TestPlatform.EntityFrameworkCore/"]
COPY ["aspnet-core/src/Aqua.TestPlatform.Core/Aqua.TestPlatform.Core.csproj", "src/Aqua.TestPlatform.Core/"]
COPY ["aspnet-core/src/Aqua.TestPlatform.Application/Aqua.TestPlatform.Application.csproj", "src/Aqua.TestPlatform.Application/"]

COPY ["aspnet-core/src/Aqua.TestPlatform.Web.Host/app.config", "src/Aqua.TestPlatform.Web.Host/"]
RUN dotnet restore "src/Aqua.TestPlatform.Web.Host/Aqua.TestPlatform.Web.Host.csproj"
COPY "aspnet-core/." .
WORKDIR "/src/src/Aqua.TestPlatform.Web.Host"
RUN dotnet build "Aqua.TestPlatform.Web.Host.csproj" -c Release -o /app

FROM build AS publish
COPY ["start.sh", "/app"]
RUN dotnet publish "Aqua.TestPlatform.Web.Host.csproj" -c Release -o /app

FROM node:12.7-alpine as buildContainer
WORKDIR /app
COPY "aspnet-core/src/Aqua.TestPlatform.Web.Host/angular/package.json" ./
COPY "aspnet-core/src/Aqua.TestPlatform.Web.Host/angular/yarn.lock" ./
COPY "aspnet-core/src/Aqua.TestPlatform.Web.Host/angular/ng-uikit-pro-standard-8.10.0.tgz" ./
RUN npm install -g yarn
RUN yarn
COPY "aspnet-core/src/Aqua.TestPlatform.Web.Host/angular/." .
RUN yarn run build:prod


FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-bionic
EXPOSE 80
EXPOSE 443
WORKDIR /app
COPY --from=publish /app .
COPY --from=buildContainer /app/dist ./wwwroot
COPY start.sh .
ENTRYPOINT ["sh", "./start.sh"]
