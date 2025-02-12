import React from "react";  

export const Spinner = ({isLoading = false}) => {
  return (
		<>
		{isLoading && <div className="spinner-border custom-spinner" style={{width:'31px',height:'25px', marginLeft:"7px", marginRight:"7px"}}>
				<span className="visually-hidden"></span>
		</div>}
		</>
	)
}