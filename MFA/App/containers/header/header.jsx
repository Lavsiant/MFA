import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                     
                    </ul>
                </menu>
            </header>
        );
    }
};