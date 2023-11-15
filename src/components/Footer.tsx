import './Footer.css'

export const Footer = () => {
  return (
    <footer>
      <div className="icons">
        <a href="https://github.com/HornyCapacitor" target="_blank" >
          <img className="icon" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
        </a>
        <a href="https://linkedin.com/in/mateusz-minder-b19303257" target="_blank" >
          <img className="icon" src="https://cdn.icon-icons.com/icons2/2428/PNG/512/linkedin_black_logo_icon_147114.png" />
        </a>
      </div>
      <div>
        Created by <span><a className="gold hover" href="https://linkedin.com/in/mateusz-minder-b19303257" target="_blank">Mateusz Minder</a></span>
      </div>
    </footer>
  )
}