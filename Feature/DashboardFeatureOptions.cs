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
	public class DashboardFeatureOptions
	{
		public string ContentRoot { get; set; } = Directory.GetCurrentDirectory();
		public int Port { get; set; }


		internal static readonly DashboardFeatureOptions Default = new DashboardFeatureOptions()
		{
			ContentRoot = null,
			Port = 5000
		};

		internal DashboardFeatureOptions()
		{

		}
	}
}
