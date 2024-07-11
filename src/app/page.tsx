'use client'

import ListRepo  from '../components/table/table'
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { loadRepos } from '../components/utils/load-data';
import Image from 'next/image'
import logo from '../../public/github-icon-2048x2048-823jqxdr.png'
interface Repo {
  id: number;
  name: string;
  stars: number;
  forks: number;
}

export default function Home() {
  const [repoName, setRepoName] = React.useState('');
  const [data, setRows] = React.useState<Repo[]>([]);
  const [search, setSearch] = React.useState<Repo[]>([])

  React.useEffect(() => {
    async function fetchData() {
      try {
        const repoData = await loadRepos();
        const sortedRows = repoData.sort((a, b) => b.stars - a.stars);
        setRows(sortedRows);
        setSearch(sortedRows)
      } catch (error) {
        console.error('Error loading repositories:', error);
      }
    }

    fetchData();
  }, []);

  const handlerString = (str: string): string => {
    return str.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
  };

  const searchRepo = () => {
    const index = data.filter(item => handlerString(item.name).includes(handlerString(repoName)))

    setSearch(index)
  }

  const handleInputChange = (event: any) => {
    setRepoName(event.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Best-Repo
        </p>
      </div>
      <div className="mt-32 flex flex-col justify-center text-center">
          <h1>Repositórios</h1>
          <div className='mt-10 flex justify-center items-center gap-3'>
            <div>
              <Input
                  color="neutral"
                  placeholder="Nome do Repositório"
                  size="lg"
                  variant="soft"
                  value={repoName}
                  onChange={handleInputChange}
                />
            </div>
            <div>
              <IconButton onClick={searchRepo} variant="solid" size='lg'>
                <SearchIcon />
              </IconButton>
            </div>
          </div>
      </div>
      <div className='mt-10'>
        <ListRepo data={search} />
      </div>
        <div className='mt-10 flex gap-2 items-center'>
          Feito por
          <a href='https://github.com/RafaelM-DEv'>/RafaelM-Dev</a>
          <Image src={logo} alt='Logo github'width={20} />
        </div>
    </main>
  );
}
