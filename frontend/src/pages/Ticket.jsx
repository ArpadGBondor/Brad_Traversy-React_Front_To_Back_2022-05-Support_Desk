import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketID } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [isSuccess, dispatch, isError, message]);

    useEffect(() => {
        dispatch(getTicket(ticketID));
    }, [dispatch, ticketID]);

    const onTicketClose = () => {
        dispatch(closeTicket(ticketID));
        toast.success('Ticket Closed');
        navigate('/tickets');
    };
    if (isLoading) return <Spinner />;
    if (isError) return <h3>Something went wrong.</h3>;
    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-gb')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>
                    Close Ticket
                </button>
            )}
        </div>
    );
}

export default Ticket;
