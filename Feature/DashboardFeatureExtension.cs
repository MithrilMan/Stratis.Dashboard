using Stratis.Bitcoin.Builder;
using System;
using Microsoft.Extensions.DependencyInjection;
using Stratis.Bitcoin.Configuration.Logging;

namespace Stratis.Dashboard
{
	/// <summary>
	/// A class providing extension methods for <see cref="IFullNodeBuilder"/>.
	/// </summary>
	public static class DashboardFeatureExtension
	{
		public static IFullNodeBuilder AddDashboard(this IFullNodeBuilder fullNodeBuilder, Action<DashboardFeatureOptions> configurator = null)
		{
			LoggingConfiguration.RegisterFeatureNamespace<DashboardFeature>("dashboard");

			var options = new DashboardFeatureOptions();
			configurator?.Invoke(options);

			fullNodeBuilder.ConfigureFeature(features =>
			{
				features
				.AddFeature<DashboardFeature>()
				//.DependOn<ConsensusFeature>()
				.FeatureServices(services =>
					services
						.AddSingleton(fullNodeBuilder)
						.AddSingleton<DashboardFeatureOptions>(options)
					);
			});


			fullNodeBuilder.ConfigureServices(service =>
			{
				//.AddScoped<DashboardFeature.DashboardFeatureOptions>(serviceCollection => options)
				//service.AddSingleton<DashboardFeature.DashboardFeatureOptions>(options);
				//service.AddSingleton<FullNodeController>();
				//service.AddSingleton<ConnectionManagerController>();
				//service.AddSingleton<RpcSettings>(new RpcSettings(setup));
				//service.AddSingleton<RPCController>();
			});

			return fullNodeBuilder;
		}
	}
}
