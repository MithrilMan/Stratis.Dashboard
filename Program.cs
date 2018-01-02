using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Stratis.Bitcoin.Builder;
using Stratis.Bitcoin.Configuration;
using Stratis.Bitcoin.Features.BlockStore;
using Stratis.Bitcoin.Features.Consensus;
using Stratis.Bitcoin.Features.MemoryPool;
using Stratis.Bitcoin.Features.Miner;
using Stratis.Bitcoin.Features.RPC;
using Stratis.Bitcoin.Features.Wallet;
using Stratis.Bitcoin.Utilities;

namespace Stratis.Dashboard
{
	public class Program
	{
		public static void Main(string[] args)
		{
			MainAsync(args).Wait();
		}

		public static async Task MainAsync(string[] args)
		{
			try
			{

				var webOnly = Environment.GetEnvironmentVariable("WEB_ONLY") ?? "false";
				if (webOnly?.ToLower() == "true")
				{
					await WebHost
						.CreateDefaultBuilder()
						.UseStartup<Startup>()
						.Build()
						.RunAsync();
				}
				else
				{
					NodeSettings nodeSettings = new NodeSettings().LoadArguments(args);

					var node = new FullNodeBuilder()
						 .UseNodeSettings(nodeSettings)
						 .UseConsensus()
						 .UseBlockStore()
						 .UseMempool()
						 .AddMining()
						 .AddRPC()
						 .UseWallet()
						 .AddDashboard(config =>
						 {
							 config.Port = 5001;
						 })
						 .Build();

					await node.RunAsync();
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine("There was a problem initializing the node. Details: '{0}'", ex.Message);
			}
		}
	}
}