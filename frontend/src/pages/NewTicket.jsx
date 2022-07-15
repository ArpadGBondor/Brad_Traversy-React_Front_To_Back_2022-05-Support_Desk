import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        // Redirect when logged in
        if (isSuccess) {
            dispatch(reset());
            navigate('/tickets');
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        // Validate data...

        const ticketData = {
            product,
            description,
        };
        dispatch(createTicket(ticketData));
    };

    if (isLoading) return <Spinner />;

    return (
        <>
            <BackButton url="/" />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" className="form-control" name="name" value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input type="text" className="form-control" name="email" value={email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                            placeholder="Description"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Create Ticket</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default NewTicket;
