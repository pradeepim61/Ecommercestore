using System;
using API.Entities;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        return orderBy switch
        {
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)
        };
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? search)
    {
        if (string.IsNullOrEmpty(search)) return query;

        return query.Where(p => p.Name.ToLower().Contains(search.Trim().ToLower()));
    }

    public static IQueryable<Product> FilterByBrand(this IQueryable<Product> query, string? brands, string? types)
    {
        if (string.IsNullOrEmpty(brands) && string.IsNullOrEmpty(types)) return query;

        var brandList = brands?.Split(",").ToList();
        var typeList = types?.Split(",").ToList();

        if (typeList != null && typeList.Count != 0)
        {
            query = query.Where(p => typeList.Contains(p.Type));
        }

        if (brandList != null && brandList.Count != 0)
        {
            query = query.Where(p => brandList.Contains(p.Brand));
        }

        return query;
    }

}
