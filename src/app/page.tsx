'use client'

import ListRepo  from '../components/table/table'
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';

export default function Home() {
  const [repoName, setRepoName] = React.useState('');

  const searchRepo = () => {
    console.log('Fui chamado', repoName)
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
        <ListRepo/>
      </div>
    </main>
  );
}
