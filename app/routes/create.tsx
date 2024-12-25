import { useNavigate } from '@remix-run/react'
import { useAtom } from 'jotai'
import React from 'react'
import { SimpleEditor } from '~/components/Editor'
import { global_session } from '~/store'

const create = () => {
    const session = useAtom<any>(global_session)[0]
const navigate=useNavigate()
    if(!session){
navigate("/",{replace:true})
}
  return (
<SimpleEditor/>
  )
}

export default create
