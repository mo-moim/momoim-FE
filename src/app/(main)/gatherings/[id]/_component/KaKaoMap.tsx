import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

export default function KaKaoMap({ address }: { address: string | undefined }) {
  const [error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAP_KEY!,
    libraries: ["services"],
  });
  const [coordinates, setCoordinates] = useState({ lat: 33.5563, lng: 126.79581 });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (window.kakao) setLoad(true);
  }, [load]);

  useEffect(() => {
    if (!address || error) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0]; // 주소 좌표값
        setCoordinates({
          lat: parseFloat(y),
          lng: parseFloat(x),
        });
      }
    });
  }, [address, error]);

  if (error) return <div>에러입니다.</div>;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">모임 장소</h3>
      <div className="overflow-hidden rounded-lg border border-gray-400">
        <Map id="map" center={coordinates} className="h-[300px] w-full" draggable={false} scrollwheel={false} level={3}>
          <MapMarker position={coordinates} />
        </Map>
        <div className="p-5">
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
}
