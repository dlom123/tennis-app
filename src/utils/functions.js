export function getGenderTextClass (gender) {
  return { textMen: gender === 'm', textWomen: gender === 'f' }
}
