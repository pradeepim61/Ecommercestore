import { Grid2, Pagination, Typography } from "@mui/material";
import type { Pagination as PaginationType } from "../../models/pagination";

type Props = {
    metaData: PaginationType
    onPageChange: (page: number) => void
}

export default function AppPagination({ metaData, onPageChange }: Props) {
    const { currentPage, totalCount, totalPages, pageSize } = metaData;

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    return (
        <Grid2 container display='flex' justifyContent='space-between' alignItems='center' sx={{ marginTop: 3 }}>
            <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', mb: { xs: 2, sm: 0 } }} >
                <Typography>
                    Displaying {startItem}- {endItem} of {totalCount} items
                </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Pagination color="secondary" size="large" count={totalPages} page={currentPage} onChange={(_, page) => onPageChange(page)}>
                </Pagination>
            </Grid2>
        </Grid2>

    )
}