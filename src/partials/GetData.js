import React from "react";
import { useFetch } from '../utils/useFetch';

function GetData() {

  const untappd_client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const untappd_client_id     = process.env.REACT_APP_CLIENT_ID;
  const untappd_username      = process.env.REACT_APP_USERNAME;

  const [data, loading] = useFetch(
    `https://api.untappd.com/v4/user/checkins/${untappd_username}/?client_id=${untappd_client_id}&client_secret=${untappd_client_secret}`
  );

  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Last 25 checkins</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Beer</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Brewery</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Style</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Location</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Rating</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Rows */}
              {loading ? (
                "Loading checkins..."
              ) : (
                data.response.checkins.items.map(({ checkin_id, beer, brewery, venue, rating_score }) => (
                  <tr key={`checkin-${checkin_id}`}>
                    <td className="p-2">
                      <div className="">
                        {beer.beer_name}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="">
                      {brewery.brewery_name}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-green-500">
                        {beer.beer_style}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="">
                      {venue.venue_name}, {venue.location.venue_city}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-light-blue-500">
                      {rating_score}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetData;