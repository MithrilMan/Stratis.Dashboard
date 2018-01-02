using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Stratis.Bitcoin;
using Stratis.Bitcoin.Builder;
using Stratis.Bitcoin.Builder.Feature;
using System;
using System.IO;
using Microsoft.Extensions.DependencyInjection;

namespace Stratis.Dashboard
{
	public class DashboardFeature : FullNodeFeature
	{
		private IWebHost host;
		private readonly DashboardFeatureOptions dashboardFeatureOptions;
		private readonly IFullNodeBuilder fullNodeBuilder;
		private readonly FullNode fullNode;
		private readonly ILogger logger;

		public FullNode FullNode { get; private set; }

		public DashboardFeature(IFullNodeBuilder fullNodeBuilder, FullNode fullNode, DashboardFeatureOptions dashboardFeatureOptions, ILoggerFactory loggerFactory)
		{
			this.fullNodeBuilder = fullNodeBuilder;
			this.fullNode = fullNode;
			this.dashboardFeatureOptions = dashboardFeatureOptions ?? DashboardFeatureOptions.Default;
			this.logger = loggerFactory.CreateLogger(this.GetType().FullName);
		}

		public override void Start()
		{
			if (host == null)
			{
				try
				{
					var hostBuilder = new WebHostBuilder()
					  .UseKestrel()
					  .ConfigureServices(collection =>
					  {
						  if (this.fullNodeBuilder != null && this.fullNodeBuilder.Services != null && this.fullNode != null)
						  {
							  // copies all the services defined for the full node to the Api.
							  // also copies over singleton instances already defined
							  foreach (var service in this.fullNodeBuilder.Services)
							  {
								  object obj = this.fullNode.Services.ServiceProvider.GetService(service.ServiceType);

								  if (obj != null && service.Lifetime == ServiceLifetime.Singleton && service.ImplementationInstance == null)
								  {
									  collection.AddSingleton(service.ServiceType, obj);
								  }
								  else
								  {
									  collection.Add(service);
								  }
							  }
						  }
					  })
					  ;

					if (dashboardFeatureOptions.ContentRoot != null)
					{
						hostBuilder.UseContentRoot(dashboardFeatureOptions.ContentRoot);
					}

					hostBuilder.UseUrls($"http://localhost:{dashboardFeatureOptions.Port}")
					  .UseStartup<Startup>()
					  .ConfigureServices(services =>
					  {
						  services.AddSingleton<FullNode>(fullNode); //register the FullNode instance in the local dashboard webhost service provider
					  });



					host = hostBuilder.Build();

					host.Start();

					this.logger.LogInformation($"Dashboard STARTED on port {dashboardFeatureOptions.Port}");
				}
				catch (Exception ex)
				{
					this.logger.LogError($"Error starting Dashboard on port {dashboardFeatureOptions.Port}: {ex.Message}");
				}
			}
			else
			{
				this.logger.LogWarning($"Dashboard already started");
			}
		}

		public override void Stop()
		{
			if (host != null)
			{
				//can Kestrel be stopped?
			}
		}



		///// <summary>
		///// returns the required service from the registered services in the feature
		///// Not sure this method should be exposed because some internals shouldn't probably be exposed this way
		///// </summary>
		///// <typeparam name="TService"></typeparam>
		///// <returns></returns>
		//public TService GetService<TService>()
		//{
			
		//}
	}
}
