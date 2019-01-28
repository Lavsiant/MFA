using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbRepository;
using DbRepository.Factories;
using DbRepository.Interfaces;
using DbRepository.Repositories;
using MFA.Services.Implementations;
using MFA.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MFA
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
   
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddDefaultIdentity<IdentityUser>()
               .AddEntityFrameworkStores<RepositoryContext>();

            services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
            services.AddScoped<IIdentityRepository>(provider => new IdentityRepository(Configuration.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>())); // 2
            services.AddScoped<IIdentityService, IdentityService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {      
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware();
            }

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "DefaultApi",
                    template: "api/{controller}/{action}/{id?}");
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
