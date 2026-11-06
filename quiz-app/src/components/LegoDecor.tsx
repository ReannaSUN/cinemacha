/** Decorative floating Lego bricks — pure CSS, no interaction. */
export function LegoDecor() {
  return (
    <div className="lego-float" aria-hidden="true">
      <span className="brick brick-y studs-2" style={{ left: '4%', top: '12%' }} />
      <span className="brick brick-b studs-2" style={{ right: '6%', top: '18%' }} />
      <span className="brick brick-g studs-3" style={{ left: '8%', bottom: '22%' }} />
      <span className="brick brick-r studs-2" style={{ right: '5%', bottom: '16%' }} />
      <span className="brick brick-p studs-1" style={{ left: '46%', top: '6%' }} />
    </div>
  )
}
