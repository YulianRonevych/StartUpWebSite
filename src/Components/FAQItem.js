import React from 'react';

export default function HelpItem({ question, onClick }) {
    let classes = `help-items__help-item help-item`;
    let id = `help-item-${question.id}`;

    if (question.expanded === true) {
        classes += ' expanded';
        let helpItem = document.getElementById(`help-item-${question.id}`);
        let paragraph = document.getElementById('help-item__text' + question.id);
        helpItem.style.paddingBottom = paragraph.scrollHeight + 55 + 'px';
    } else {
        let helpItem = document.getElementById(`help-item-${question.id}`);
        if (helpItem !== null) {
            helpItem.style.paddingBottom = '28px';
        }
    }

    return (
        <div id={id} className={classes} onClick={() => onClick(question)}>
            <h3 className="help-item__title">{question.title}</h3>
            <p
                id={'help-item__text' + question.id}
                className="help-item__text"
                onClick={(event) => event.stopPropagation()}
            >
                {question.body}
            </p>
        </div>
    );
}
