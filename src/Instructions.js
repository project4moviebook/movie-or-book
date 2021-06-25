const Instructions = function (props) {
    return (
        <div className="instructionsContainer">
            <div className="instructionsInnerContainer">
                <h2>Instructions</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi quisquam obcaecati dolores itaque voluptates blanditiis excepturi, corporis in magnam alias a aliquam vel laboriosam nesciunt eius fugiat soluta illo nemo sunt dicta repellendus debitis! Molestias, corporis! Temporibus qui, quaerat consequatur aperiam ab soluta dolorum totam, perferendis perspiciatis doloribus quod adipisci!</p>
                <div className="instructionsDiv">
                    {/* used to scroll down to main on click */}
                    <button onClick={props.scrollButton} className="instructionsButton">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Instructions;