using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Xunit;
using Xunit.Abstractions;

namespace Aqua.TestPlatform.Tests.Here
{
    public class HereTests : TestPlatformTestBase
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public HereTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public void ReqCoord()
        {
            var auth = "AHlteDdKSXGDbfkphDbl5gA";
            // var web = new WebClient();
            // web.Headers.Add("authorization", $"Bearer {auth}");
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create("https://xyz.api.here.com/hub/spaces/o3m7nRsU/iterate");
            request.Method = "GET";
            request.Headers.Add("authorization", $"Bearer {auth}");
            String test = String.Empty;
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                test = reader.ReadToEnd();
                reader.Close();
                dataStream.Close();
            }
            
            // _testOutputHelper.WriteLine(test);
            _testOutputHelper.WriteLine(
                JsonConvert.SerializeObject(
                Regex.Matches(test, "район").Cast<Match>().Select(m => m.Index))
                );
            
        }
    }
}