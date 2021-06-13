using Microsoft.Extensions.Configuration;

namespace ChatAngularProject.Tools
{
    public class AppVariableConfiguration
    {
        public static IConfigurationRoot ConfigurationRoot()
        {
            var configurationBuilder = new ConfigurationBuilder();
            configurationBuilder.AddJsonFile("appsettings.json", true)
                .AddEnvironmentVariables("CHATAPP_");
            var configuration = configurationBuilder.Build();
            return configuration;
        }
    }
}
