import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCodeCommit, faFileCode, faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGitAlt } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'

export function Home({ onSubmitSuccess }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!username.trim()) {
      console.log('Please set username')
      return
    }

    setLoading(true)

    try {
      const [languageRes, streakRes, repoRes, commitRes] = await Promise.all([
        fetch(`/api/get_data/${username.trim()}`),
        fetch(`/api/activity-streak/${username.trim()}`),
        fetch(`/api/top-repos/${username.trim()}`),
        fetch(`/api/commit-stats/${username.trim()}`),
      ])

      const [language, streak, topRepo, commitStats] = await Promise.all([
        languageRes.json(),
        streakRes.json(),
        repoRes.json(),
        commitRes.json(),
      ])

      onSubmitSuccess({
        language,
        streak,
        topRepo,
        commitStats,
      })
    } catch (err) {
      console.log('error in set wrapped data', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="candy-background">
        <div className="floating-elements">
          <FontAwesomeIcon className="floating-icon icon-1" icon={faCode} />
          <FontAwesomeIcon icon={faGithub} className="floating-icon icon-2" />
          <FontAwesomeIcon icon={faFileCode} className="floating-icon icon-3" />
          <FontAwesomeIcon icon={faCodeCommit} className="floating-icon icon-4" />
          <FontAwesomeIcon icon={faGitAlt} className="floating-icon icon-5" />
        </div>
      </div>

      <div className="pt-30 instrument-font grid place-items-center">
        <p className='pb-5'><FontAwesomeIcon icon={faLaptopCode} /> GitWrapped '26</p>
        <p className='pt-10 text-center text-7xl'>Your year <br />in code.</p>
        <p className='pt-5 instrument-font-light text-center'>
          Discover your top languages, most active repositories, and coding<br />
          habits of 2026.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='text-center flex-col pt-10'>
          <input
            type='text'
            className='shadow-lg bg-white h-8 row text-center border-2 rounded-2xl w-75'
            placeholder='@ username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type='submit'
            disabled={loading}
            className='shadow row bg-pink-300 rounded-2xl mx-2 h-8 w-25'
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  )
}