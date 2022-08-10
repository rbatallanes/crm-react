import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const [cliente,setCliente]= useState({})
  const [cargando,setCargando]= useState(true)

  const {id} = useParams()

  useEffect(()=>{
    //setCargando(!cargando)
    const getCliente = async ()=>{
        try {
            const url = `http://localhost:4000/clientes/${id}`
            const resp = await fetch(url)
            const result = await resp.json()

            setCliente(result);
        } catch (error) {
            console.log(error)
        }

        setCargando(!cargando)
    }
    getCliente()
    
  },[])

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p  className='mt-3'>Utilizar este formulario para editar un cliente</p>

      {cliente?.nombre ? (
        <Formulario
          cliente={cliente}
        />
      ): <p>Cliente ID no válido</p>}
      
    </>
  )
}

export default EditarCliente