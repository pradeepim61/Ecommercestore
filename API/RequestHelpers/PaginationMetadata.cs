using System;

namespace API.RequestHelpers;

public class PaginationMetadata
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }

    // public PaginationMetadata(int currentPage, int totalPages, int pageSize, int totalCount)
    // {
    //     CurrentPage = currentPage;
    //     TotalPages = totalPages;
    //     PageSize = pageSize;
    //     TotalCount = totalCount;
    // }
}
