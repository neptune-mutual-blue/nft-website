import {
  Fragment,
  useContext,
  useEffect,
  useState
} from 'react'

import AlertInfo from '@/components/Alert/AlertInfo'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { EvmErrorModal } from '@/components/EvmError/EvmErrorModal'
import { LoaderPopup } from '@/components/LoaderPopup/LoaderPopup'
import { ToastContext } from '@/components/Toast/Toast'
import {
  PersonaLevelGroups,
  Personas
} from '@/config/persona'
import {
  ContractAbis,
  ContractAddresses,
  useContractCall
} from '@/hooks/useContractCall'
import { NftApi } from '@/service/nft-api'
import GuardianBeastSelection from '@/views/my-persona/GuardianBeastSelection'
import Onboarding from '@/views/my-persona/Onboarding'
import PersonaLoader from '@/views/my-persona/PersonaLoader'
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

const initialSelections = {
  1: Personas.GUARDIAN,
  3: Personas.GUARDIAN,
  5: Personas.GUARDIAN
}

const initialSelectionsEmpty = {
  1: '',
  3: '',
  5: ''
}

const MyPersona = ({ characters }) => {
  const [selectedLevels, setSelectedLevels] = useState([])
  const [radioSelections, setRadioSelections] = useState(initialSelections)

  const [sidebarSelections, setSidebarSelections] = useState(initialSelectionsEmpty)

  const [loading, setLoading] = useState(false)
  const [settingPersona, setSettingPersona] = useState(false)
  const [locked, setLocked] = useState(false)
  const [error, setError] = useState('')

  const { account, active } = useWeb3React()

  const { callMethod, isReady } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const { showToast, setOpen: setToastOpen } = useContext(ToastContext)

  const setPersona = async (unsafe = false) => {
    if (!isReady) return
    setError('')
    setSettingPersona(true)
    setToastOpen(false)

    try {
      const personas = Object.values(radioSelections).map((selection) => selection === Personas.GUARDIAN ? 1 : 2)

      const response = await callMethod('setMyPersona', [personas], unsafe)

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Error',
          description: response?.error ?? 'Unknown Error'
        })
      } else if (response) {
        setShowPersonaSet(true)
        setLocked(true)
      }
    } catch (err) {
      console.error(err)
    }

    setSettingPersona(false)
    setToastOpen(false)
  }

  const getPersona = async () => {
    setLoading(true)
    try {
      const response = await NftApi.getPersona(account)

      if (response && response.length === 6) {
        const persona = {}

        response.forEach(personaLevel => {
          if (persona.level % 2 === 1) {
            persona[personaLevel.level] = personaLevel.persona === 1 ? Personas.GUARDIAN : Personas.BEAST
          }
        })

        setRadioSelections(persona)
        setSidebarSelections(persona)
        setSelectedLevels([1, 2])
        setLocked(true)
      } else {
        setRadioSelections(initialSelections)
        setSidebarSelections(initialSelectionsEmpty)
        setSelectedLevels([])
        setLocked(false)
      }
    } catch (err) {

    }
    setLoading(false)
  }

  useEffect(() => {
    if (account) {
      getPersona()
    }
    // eslint-disable-next-line
  }, [account])

  const [showPersonaSet, setShowPersonaSet] = useState(false)

  useEffect(() => {
    if (selectedLevels.length > 0) {
      PersonaLevelGroups.forEach((levels) => {
        if (levels[0] < selectedLevels[1]) {
          const key = levels[0]
          setSidebarSelections((val) => ({ ...val, [key]: radioSelections[key] }))
        }
      })
    }
  }, [selectedLevels, radioSelections])

  return (
    <div className='my persona page'>
      <LoaderPopup visible={settingPersona} title='Setting Your Persona...' />
      <EvmErrorModal
        open={error !== ''} setOpen={() => {
          setError('')
        }}
        onOK={() => {
          setPersona(true)
        }}
        error={error}
      />

      <div className='inner content'>

        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        {loading && (
          <PersonaLoader />
        )}

        {!loading && (
          <div className='wizard'>
            {!active && (
              <>
                <AlertInfo text='Please connect your wallet to set or view your persona.' />
                <div className='overlay' />
              </>
            )}
            <div className='persona setting'>
              <button
                onClick={() => {
                  setSelectedLevels([])
                }} className='leading content'
              >
                <div className='supporting text'>
                  Tell us who you are
                </div>
                <h1>Set Your Persona</h1>
              </button>
              {PersonaLevelGroups.map(levelGroup => (
                <Fragment key={levelGroup[0]}>
                  <div className='separator' />
                  <PersonaSelection
                    locked={locked}
                    characters={characters}
                    levels={levelGroup}
                    selected={selectedLevels.includes(levelGroup[0])}
                    selection={sidebarSelections[levelGroup[0]]}
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
                  onSelectionChange={(value) => { setRadioSelections({ ...radioSelections, [selectedLevels[0]]: value }) }}
                />
              )}
            </div>
          </div>
        )}

      </div>

      <PersonaSetModal characters={characters} visible={showPersonaSet} setVisible={setShowPersonaSet} selections={radioSelections} />
    </div>
  )
}

export default MyPersona
