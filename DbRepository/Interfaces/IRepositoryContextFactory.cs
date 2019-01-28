using System;
using System.Collections.Generic;
using System.Text;

namespace DbRepository.Interfaces
{
    public interface IRepositoryContextFactory
    {
        RepositoryContext CreateDbContext(string connectionString);
    }
}
