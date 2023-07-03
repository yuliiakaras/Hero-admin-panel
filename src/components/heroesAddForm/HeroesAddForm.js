import {useHttp} from '../../hooks/http.hook';
import { addHero } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';


import {Formik, Form, ErrorMessage, Field} from 'formik';
import * as Yup from 'yup';

import { v4 as uuidv4 } from 'uuid';

const HeroesAddForm = () => {

    const dispatch = useDispatch();
    const { filters, filtersLoadingStatus } = useSelector(state => state)
    const {request} = useHttp();

    const renderFilters = (filters, status) => {
        if(status === 'loading') {
            return <option>Loading...</option>
        } else if(status === 'error') {
            return <option>Error</option>
        }

        if(filters && filters.length > 0) {

            return filters.map(({name, label}) => {
                 // eslint-disable-next-line
                if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <Formik
            initialValues={{
                id: '',
                name: '',
                description: '',
                element: ''
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string().required('This field is required!'),
                    description: Yup.string().required('This field is required!'),
                    element: Yup.string().required('This field is required!')
                })
            }
            onSubmit={ async (values, {resetForm}) => {
                const myId = uuidv4();
                const hero = {
                    id: myId,
                    ...values
                }
                console.log(myId);
                console.log(hero)
                try {
                    const response = await request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero));
                    dispatch(addHero(response));
                    console.log(response);
                    resetForm();
                } catch (error) {
                    console.error('Error creating new hero:', error);
                }
            }}
            
        >
                <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Hero`s name</label>
                    <Field
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="What`s my name?"
                        />
                    <ErrorMessage name="name" component="div" className='text-danger'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Description</label>
                    <Field
                        component="textarea"
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="What can i do?"                        
                        style={{"height": '130px'}}
                    />
                    <ErrorMessage name="description" component="div" className='text-danger'/>
                </div>
    
                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Choose hero element</label>
                    <Field 
                        as='select'
                        className="form-select" 
                        id="element" 
                        name="element">
                        <option >I can summon...</option>
                        {renderFilters(filters, filtersLoadingStatus)}
                    </Field>
                    <ErrorMessage name="element" component="div" className='text-danger'/>
                </div>
    
                <button type="submit" className="btn btn-primary">Create</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;