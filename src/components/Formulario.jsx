import { Formik,Form,Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import Alerts from './Alerts';
import {useNavigate} from 'react-router-dom'

const Formulario = ({cliente}) => {

  const navigate = useNavigate()

  const clienteSchema = Yup.object({
      nombre: Yup.string()
                  .min(3,'El nombre es muy corto')
                  .max(10,'El nombre es muy largo')
                  .required('Nombre del Cliente es Obligatorio'),
      empresa: Yup.string().required('Empresa del Cliente es Obligatorio'),
      email: Yup.string().email('Email no válido')
                          .required('Email es Obligatorio'),
      telefono: Yup.number().required('Teléfono es Obligatorio')
                          .positive('Número no válido')
                          .integer('Número no válido')
                          .typeError('Número no válido'),
      notas: Yup.string(),
  });

  const handleSubmit=async (values)=>{
    try {
      let respuesta
      if(cliente.id){
        const url       = `http://localhost:4000/clientes/${cliente.id}`
        respuesta = await fetch(url,{
          method:'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }else{
        const url       = 'http://localhost:4000/clientes'
        respuesta = await fetch(url,{
          method:'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })

      }
      const result = await respuesta.json()
      navigate('/clientes')

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
        {cliente?.nombre ? 'Editar' : 'Agregar'} Cliente</h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async(values,{resetForm})=>{
          await handleSubmit(values)
          resetForm()
        }}
        validationSchema={clienteSchema}
      >
        {({errors,touched})=>{
          //console.log(data)
          return (
        <Form className='mt-10'>
          <div className='mb-4'>
            <label
              className='text-gray-800'
              htmlFor='name'
            >Nombre:</label>
            <Field 
              id='name'
              type= 'text'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Nombre del Cliente'
              name='nombre'
            />
            {errors.nombre && touched.nombre?(
                <Alerts>{errors.nombre }</Alerts>
            ):null}
          </div>
          <div className='mb-4'>
            <label
              className='text-gray-800'
              htmlFor='empresa'
            >Empresa:</label>
            <Field 
              id='empresa'
              type= 'text'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Empresa del Cliente'
              name='empresa'
            />
            {errors.empresa && touched.empresa?(
                <Alerts>{errors.empresa }</Alerts>
            ):null}
          </div>
          <div className='mb-4'>
            <label
              className='text-gray-800'
              htmlFor='email'
            >E-mail:</label>
            <Field 
              id='email'
              type= 'email'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Email del Cliente'
              name='email'
            />
            {errors.email && touched.email?(
                <Alerts>{errors.email }</Alerts>
            ):null}
          </div>
          <div className='mb-4'>
            <label
              className='text-gray-800'
              htmlFor='telefono'
            >Teléfono:</label>
            <Field 
              id='telefono'
              type= 'tel'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Teléfono del Cliente'
              name='telefono'
            />
            {errors.telefono && touched.telefono?(
                <Alerts>{errors.telefono }</Alerts>
            ):null}
          </div>
          <div className='mb-4'>
            <label
              className='text-gray-800'
              htmlFor='notas'
            >Notas:</label>
            <Field 
              as='textarea'
              id='notas'
              type= 'tel'
              className='mt-2 block w-full p-3 bg-gray-50 h-40'
              placeholder='Notas del Cliente'
              name='notas'
            />
          </div>

          <input 
              type='submit'
              value={cliente?.nombre ? 'Editar' : 'Agregar'}
              className='mt-5 p-3 bg-blue-800 block w-full text-white uppercase rounded-md font-bold text-lg'
              />
          
        </Form>
        )}}
      </Formik>
    </div>
  )
} 

Formulario.defaultProps ={
  cliente: {}
}

export default Formulario