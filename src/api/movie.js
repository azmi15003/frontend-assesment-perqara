export const getMovieLists = async (page = 1) => {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

  try {
    const response = await fetch(url, {
      method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie lists:', error.message)
    throw error
  }
}

export const getDetailTVMovie = async (id, type = 'movie') => {
  const url = `https://api.themoviedb.org/3/${type}/${id}?language=en-US`

  try {
    const response = await fetch(url, {
      method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie lists:', error.message)
    throw error
  }
}

export const getReviewTVMovie = async (id, type = 'movie') => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1`

  try {
    const response = await fetch(url, {
      method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie lists:', error.message)
    throw error
  }
}

export const getRecomendationTVMovie = async (id, type = 'movie') => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`

  try {
    const response = await fetch(url, {
      method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie lists:', error.message)
    throw error
  }
}

export const getGenreList = async (type = 'movie') => {
  const url = `https://api.themoviedb.org/3/genre/${type}/list?language=en`

  try {
    const response = await fetch(url, {
      method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie lists:', error.message)
    throw error
  }
}