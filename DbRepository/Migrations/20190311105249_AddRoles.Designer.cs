﻿// <auto-generated />
using System;
using DbRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DbRepository.Migrations
{
    [DbContext(typeof(RepositoryContext))]
    [Migration("20190311105249_AddRoles")]
    partial class AddRoles
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Model.Token", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ExpiredDate");

                    b.Property<string>("Value");

                    b.HasKey("ID");

                    b.ToTable("Token");
                });

            modelBuilder.Entity("Model.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Login");

                    b.Property<string>("Password");

                    b.Property<int>("Role");

                    b.Property<int?>("TokenID");

                    b.HasKey("ID");

                    b.HasIndex("TokenID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Model.User", b =>
                {
                    b.HasOne("Model.Token", "Token")
                        .WithMany()
                        .HasForeignKey("TokenID");
                });
#pragma warning restore 612, 618
        }
    }
}
