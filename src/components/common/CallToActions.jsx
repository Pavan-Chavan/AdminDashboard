import { api } from '@/utils/apiProvider';
import { getUserId } from '@/utils/DOMUtils';
import { showAlert } from '@/utils/isTextMatched';
import axios from 'axios';
import { useState } from 'react';

const CallToActions = ({data, business, disabled, claim=false}) => {
  const [email,setEmail] = useState('');

  const claimBusiness = async () => {
    try {
      const response = await axios.post(`${api}/api/claim/postClaim`, {
        email : email,
        id: business === "venue" ? data.venue_id : data.service_reg_id,
        type : business
      });
      if (response.data.success) {
        showAlert(response.data.message,"success")
      }
    } catch (error) {
      showAlert(error?.response?.data?.message,"danger")
    }
  }

  return (
    <section className="layout-pt-md layout-pb-md bg-dark-2">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-auto">
            <div className="row y-gap-20  flex-wrap items-center">
              <div className="col-auto">
                <div className="icon-newsletter text-60 sm:text-40 text-white" />
              </div>
              {claim ? <div className="col-auto">
                <h4 className="text-26 text-white fw-600">
                  This business is associated with {data?.name || data?.vendor_name || ""}
                </h4>
                {disabled ?
                <div className="text-white">
                  This business is already associated with you.
                </div>
                :
                <div className="text-white">
                  Claim your business
                </div>
              }
              </div> :
              <div className="col-auto">
              <h4 className="text-26 text-white fw-600">
                Join our letter
              </h4>
              <div className="text-white">
                This business is already associated with you.
              </div>
            </div>
            }
              
            </div>
          </div>
          {/* End .col */}

          {claim ? <div className="col-auto">
            <div className="single-field -w-410 d-flex x-gap-10 y-gap-20">
              <div>
                <input
                  className="bg-white h-60"
                  type="text"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="Your registered Email"
                />
              </div>
              {/* End email input */}

              <div>
                <button disabled={disabled} className="button -md h-60 bg-blue-1 text-white" onClick={claimBusiness}>
                  Claim Your Business
                </button>
              </div>
              {/* End subscribe btn */}
            </div>
          </div> :
          <div className="col-auto">
          <div className="single-field -w-410 d-flex x-gap-10 y-gap-20">
            <div>
              <input
                className="bg-white h-60"
                type="text"
                placeholder="Enter Your Email"
              />
            </div>
            {/* End email input */}

            <div>
              <button className="button -md h-60 bg-blue-1 text-white">
                Submit
              </button>
            </div>
            {/* End subscribe btn */}
          </div>
        </div>
        }
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default CallToActions;
