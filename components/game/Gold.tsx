export const Gold = (props: { gold: number }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        marginLeft: '0.5em',
        marginRight: '0.5em',
        paddingLeft: '0.1em',
        paddingRight: '0.1em',
        color: 'gold',
        backgroundColor: '#167da6',
        borderRadius: '10px',
        fontSize: '0.8em',
      }}
    >
      {props.gold} Gold
    </span>
  )
}
