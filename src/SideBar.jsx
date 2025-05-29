import './SideBar.css';
import { useAppContext } from "./AppContext";

function SideBar() {
  const { isSwitchOn, ItemPerPage, SetItemsPerPage } = useAppContext();
  const sidebarclass = isSwitchOn ? "SideBar-dark" : "SideBar";
  const sidebarbuttonclass = isSwitchOn ? "Sidebutton-dark" : "Sidebutton";
  const sliderClass = isSwitchOn ? "PageSlider-dark" : "PageSlider"

  return (
    <div className={sidebarclass}>
      <div className="main">
        <div className="top">
          <div className={sidebarbuttonclass} style={{cursor: "pointer"}}>New</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass} style={{cursor: "pointer"}}>Trending</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass} style={{cursor: "pointer"}}>Fashion</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass} style={{cursor: "pointer"}}>kys</div>
          <div className="line"></div>
          <div className={sidebarbuttonclass} style={{cursor: "pointer"}}>sybau</div>
          <div className="line"></div>
        </div>

        <div className="bottom">
          <label style={{ display: "block", margin: "1rem 0", color: isSwitchOn ? "#fff" : "#000" }}>
            Items per page: {ItemPerPage}
          </label>
          <input
            type="range"
            min={10}
            max={100}
            step={10}
            value={ItemPerPage}
            className={sliderClass}
            onChange={(e) => SetItemsPerPage(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
