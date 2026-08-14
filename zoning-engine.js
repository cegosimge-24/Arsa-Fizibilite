
export function calculateFeasibility(parcelArea, zoning, apartmentSizes=[70,80,90,100,110,120]){
  const area=Number(parcelArea)||0;
  const emsal=Number(zoning.emsal)||0;
  const taks=Number(zoning.taks)||0;
  const floors=Number(zoning.floors)||0;
  const theoreticalEmsal=area*emsal;
  const theoreticalFootprint=area*taks;
  const bySize=apartmentSizes.map(size=>({
    size,
    count: Math.floor(theoreticalEmsal/size),
    label:size<=80?'1+1 / küçük':size<=100?'2+1':'3+1'
  }));
  return {theoreticalEmsal,theoreticalFootprint,floors,bySize};
}
