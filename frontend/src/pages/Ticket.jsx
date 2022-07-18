import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket, errorReset, ticketReset } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset, errorReset as notesErrorReset } from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);
    const {
        notes,
        isLoading: notesIsLoading,
        isSuccess: notesIsSuccess,
        isError: notesIsError,
        message: notesMessage,
    } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketID } = useParams();

    useEffect(() => {
        if (isError & message) {
            toast.error(message);
            dispatch(errorReset());
        }
        if (notesIsError & notesMessage) {
            toast.error(notesMessage);
            dispatch(notesErrorReset());
        }
    }, [dispatch, isError, message, notesIsError, notesMessage]);

    useEffect(() => {
        dispatch(getTicket(ticketID));
        dispatch(getNotes(ticketID));
        return () => {
            dispatch(ticketReset());
            dispatch(notesReset());
        };
        // eslint-disable-next-line
    }, []);

    const onTicketClose = () => {
        dispatch(closeTicket(ticketID));
        toast.success('Ticket Closed');
        navigate('/tickets');
    };
    if (isLoading || notesIsLoading) return <Spinner />;
    if (isError || notesIsError) return <h3>Something went wrong.</h3>;
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
                <h2>Notes</h2>
            </header>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>
                    Close Ticket
                </button>
            )}
        </div>
    );
}

export default Ticket;
