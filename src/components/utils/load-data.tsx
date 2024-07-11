
export const loadRepos = async () => {
  // [ ] Poderia criar uma busca pelo userName
  const userName = 'rafaelm-dev'
  const fullData = await fetch(`https://api.github.com/users/${userName}/repos`)
  const fullDataJson = await fullData.json()

  const fullRepos: [{id: number, name: string, stars: number, forks: number}] = fullDataJson.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      stars: item.stargazers_count,
      forks: item.forks_count
    }
  })

  return fullRepos
}