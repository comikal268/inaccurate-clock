import { useState } from 'react';

export default function CRUDTable() {
    let data = '';
    fetch(`/api/entries`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}})
    .then(result => {
        data = result.toString();
    });
    return (<>
                <table>
                    <td>{{data}}</td>
                </table>
            </>);
}
