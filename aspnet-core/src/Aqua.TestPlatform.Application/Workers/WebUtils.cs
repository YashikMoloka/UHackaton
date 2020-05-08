using System;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using Abp.Configuration;

namespace Aqua.TransneftCabinet.Workers.TnsNewsLoader
{
    public static class WebUtils
    {
        public static Encoding GetEncodingFrom(
            NameValueCollection responseHeaders,
            Encoding defaultEncoding = null)
        {
            if(responseHeaders == null)
                throw new ArgumentNullException("responseHeaders");

            //Note that key lookup is case-insensitive
            var contentType = responseHeaders["Content-Type"];
            if(contentType == null)
                return defaultEncoding;

            var contentTypeParts = contentType.Split(';');
            if(contentTypeParts.Length <= 1)
                return defaultEncoding;

            var charsetPart =
                contentTypeParts.Skip(1).FirstOrDefault(
                    p => p.TrimStart().StartsWith("charset", StringComparison.InvariantCultureIgnoreCase));
            if(charsetPart == null)
                return defaultEncoding;

            var charsetPartParts = charsetPart.Split('=');
            if(charsetPartParts.Length != 2)
                return defaultEncoding;

            var charsetName = charsetPartParts[1].Trim();
            if(charsetName == "")
                return defaultEncoding;

            try
            {
                return Encoding.GetEncoding(charsetName);
            }
            catch(ArgumentException ex) 
            {
                throw new InvalidOperationException(
                    "The server returned data in an unknown encoding: " + charsetName, 
                    ex);
            }
        }
    }
    
    public static class WebClientExtensions
    {
        public static string DownloadStringAwareOfEncoding(this WebClient webClient, Uri uri)
        {
            var rawData = webClient.DownloadData(uri);
            var encoding = WebUtils.GetEncodingFrom(webClient.ResponseHeaders, Encoding.UTF8);
            return encoding.GetString(rawData);
        }
        public static void ConfigureProxy(this WebClient webClient, ISettingManager settingManager)
        {
            var proxyUse = Convert.ToBoolean(settingManager.GetSettingValue("Net.Proxy.UseProxy"));
            if (proxyUse)
            {
                var hostProxy = settingManager.GetSettingValue("Net.Proxy.ProxyHost");
                var portProxy = Convert.ToInt32(settingManager.GetSettingValue("Net.Proxy.ProxyPort"));
                WebProxy wp = new WebProxy(hostProxy, portProxy);
                webClient.Proxy = wp;
            }
        }
    }
}