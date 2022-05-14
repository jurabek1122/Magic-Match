const SingleCard = ({ card, HandleChoise, flipped, disabled }) => {

    const HandleClick = () => {
        if (!disabled) {
            HandleChoise(card)
        }
    }
    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img className='front' src={card.src} alt='card-front' />
                <img onClick={HandleClick} className='back' src='/img/cover.png' alt='card-back' />
            </div>
        </div>
    );
}
export default SingleCard;