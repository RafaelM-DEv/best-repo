'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { useTheme } from '@mui/material/styles';
interface Column {
  id: 'Name' | 'Stars' | 'Forks';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  onClick?: (event: any) => void;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
interface Repo {
  id: number;
  name: string;
  stars: number;
  forks: number;
  link: string;
}

interface ListRepoProps {
  data: Repo[];
}

export default function ListRepo({ data }: ListRepoProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dataList, setDataList] = React.useState(data)
  const [sortAscending, setSortAscending] = React.useState(true)

  React.useEffect(() => {
    setDataList(data)
  }, [data]);

  const columns: readonly Column[] = [
    { id: 'Name', label: 'Name', minWidth: 170, 
      onClick: (event) => {
        const sortedData = [...data].sort((a, b) => {
          if(sortAscending) {
            event.currentTarget.classList.add('rotate-180');
            event.currentTarget.classList.remove('rotate-0');

            return a.name.localeCompare(b.name)
          } else {
            event.currentTarget.classList.remove('rotate-180');
            event.currentTarget.classList.add('rotate-0');

            return b.name.localeCompare(a.name);
          }

        });

        setDataList(sortedData)
        setSortAscending(!sortAscending)
     }
    },
    { id: 'Stars', label: 'Stars', minWidth: 100, align: 'right',
      onClick: (event) => {
        const sortedData = [...data].sort((a, b) => {
          if(sortAscending) {
            event.currentTarget.classList.add('rotate-180');
            event.currentTarget.classList.remove('rotate-0');
            return a.stars > b.stars ? 1 : -1
          } else {
            event.currentTarget.classList.add('rotate-0');
            event.currentTarget.classList.remove('rotate-180');
            return a.stars > b.stars ? -1 : 1
          }
        });

        setDataList(sortedData)
        setSortAscending(!sortAscending)
      }
    },
    { id: 'Forks', label: 'Forks', minWidth: 100, align: 'right',
      onClick: (event) => {
        const sortedData = [...data].sort((a, b) => {
          if(sortAscending) {
            event.currentTarget.classList.add('rotate-180');
            event.currentTarget.classList.remove('rotate-0');
            return a.forks > b.forks ? 1 : -1
          } else {
            event.currentTarget.classList.add('rotate-0');
            event.currentTarget.classList.remove('rotate-180');
            return a.forks > b.forks ? -1 : 1
          }
        });
        
        setDataList(sortedData)
        setSortAscending(!sortAscending)
      }
    },
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
      <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className='cursor-pointer'
                >
                  {column.label}
                  <ArrowDropUpIcon id={index.toString()} onClick={column.onClick}/>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : dataList
          ).map((row: { id: number, name: string, stars: number, forks: number, link: string}) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
              <a href={row.link} target='_blank'> {row.name}</a>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.stars}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.forks}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}