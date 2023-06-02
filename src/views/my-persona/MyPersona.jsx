import {
  Fragment,
  useEffect,
  useState
} from 'react'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import {
  PersonaLevelGroups,
  Personas
} from '@/config/persona'
import GuardianBeastSelection from '@/views/my-persona/GuardianBeastSelection'
import Onboarding from '@/views/my-persona/Onboarding'
import PersonaSelection from '@/views/my-persona/PersonaSelection'
import PersonaSetModal from '@/views/my-persona/PersonaSetModal'
import { useWeb3React } from '@web3-react/core'

const crumbs = [
  {
    link: '/',
    name: 'NFT Home'
  },
  {
    link: '#',
    name: 'My Persona'
  }
]

const MyPersona = ({ characters }) => {
  const [selectedLevels, setSelectedLevels] = useState([])
  const [radioSelections, setRadioSelections] = useState({
    '1-2': Personas.GUARDIAN,
    '3-4': Personas.GUARDIAN,
    '5-6': Personas.GUARDIAN
  })

  const [sidebarSelections, setSidebarSelections] = useState({
    '1-2': '',
    '3-4': '',
    '5-6': ''
  })

  const { account } = useWeb3React()

  const setPersona = async () => {
    try {
      setShowPersonaSet(true)
    } catch (err) {
      console.error(err)
    }
  }

  const getPersona = async () => {
    try {
      // const response = await NftApi.getMerkleLeaf(account, true)
      // console.log(response)
    } catch (err) {

    }
  }

  useEffect(() => {
    if (account) {
      getPersona()
    }
  }, [account])

  // const [loading, setLoading] = useState(true)

  const locked = false

  const [showPersonaSet, setShowPersonaSet] = useState(false)

  useEffect(() => {
    if (selectedLevels.length > 0) {
      PersonaLevelGroups.forEach((levels) => {
        if (levels[0] < selectedLevels[1]) {
          const key = levels.join('-')
          setSidebarSelections((val) => ({ ...val, [key]: radioSelections[key] }))
        }
      })
    }
  }, [selectedLevels, radioSelections])

  return (
    <div className='my persona page'>
      <div className='inner content'>

        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        {/* {loading && (
          <PersonaLoader />
        )} */}

        {/* {!loading && ( */}
        <div className='wizard'>
          <div className='persona setting'>
            <div className='leading content'>
              <div className='supporting text'>
                Tell us who you are
              </div>
              <h1>Set Your Persona</h1>
            </div>
            {PersonaLevelGroups.map(levelGroup => (
              <Fragment key={levelGroup[0]}>
                <div className='separator' />
                <PersonaSelection
                  locked={locked}
                  characters={characters}
                  levels={levelGroup}
                  selected={selectedLevels.includes(levelGroup[0])}
                  selection={sidebarSelections[levelGroup.join('-')]}
                  onClick={() => {
                    setSelectedLevels(levelGroup)
                  }}
                />
              </Fragment>
            ))}
          </div>
          <div className='persona details'>
            {selectedLevels.length === 0 && (
              <Onboarding onSkip={() => {
                setSelectedLevels([1, 2])
              }}
              />
            )}
            {selectedLevels.length > 0 && (
              <GuardianBeastSelection
                onSetPersona={setPersona}
                locked={locked}
                levels={selectedLevels}
                characters={characters}
                selection={radioSelections}
                setSelectedLevels={setSelectedLevels}
                onSelectionChange={(value) => { setRadioSelections({ ...radioSelections, [selectedLevels.join('-')]: value }) }}
              />
            )}
          </div>
        </div>
        {/* )} */}

      </div>

      <PersonaSetModal characters={characters} visible={showPersonaSet} setVisible={setShowPersonaSet} selections={radioSelections} />
    </div>
  )
}

export default MyPersona
