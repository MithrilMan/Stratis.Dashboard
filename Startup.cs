using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.Reflection;

namespace Stratis.Dashboard
{
	public class Startup
	{
		public bool IsDevelopment { get; set; }
		public bool UseEmbeddedResources { get; set; }
		public IConfigurationRoot Configuration { get; }

		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				 .SetBasePath(env.ContentRootPath)
				 //.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				 //.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				 .AddEnvironmentVariables();

			this.Configuration = builder.Build();

			this.IsDevelopment = env.IsDevelopment();
			this.UseEmbeddedResources = !this.IsDevelopment;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc();

			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
				{
					configuration.RootPath = "ClientApp/dist";
				});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
			}

			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
						 name: "default",
						 template: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});




			//temp fix to disable the telemetry spammer
			try
			{
				var configuration = app.ApplicationServices.GetService<Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration>();
				configuration.DisableTelemetry = true;
			}
			finally { }
		}
	}
}
