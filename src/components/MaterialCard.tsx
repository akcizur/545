import { MATERIAL_VARIANTS } from '../config/materials'
import type { MaterialVariant } from '../config/materials'
import type { MaterialStudy } from '../data/materials'
import MaterialButton from './MaterialButton'

type MaterialCardProps = {
  material: MaterialStudy
  actionCount: number
  onActivate: (id: MaterialVariant) => void
}

export default function MaterialCard({
  material,
  actionCount,
  onActivate,
}: MaterialCardProps) {
  const variant = MATERIAL_VARIANTS[material.id]

  return (
    <article className={`study study--${material.id}`} id={material.id}>
      <div className="study-copy">
        <div className="study-heading">
          <span className="study-index">{variant.index}</span>
          <span className="study-type">{variant.label}</span>
        </div>

        <h3>{material.title}</h3>
        <p className="study-description">{material.description}</p>

        <dl className="study-specs">
          {material.specs.map((spec) => (
            <div className="study-spec" key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="study-preview">
        <div className="material-stage">
          <MaterialButton
            variant={material.id}
            label={material.buttonLabel}
            onActivate={() => onActivate(material.id)}
          />
          <span className="stage-index" aria-hidden="true">
            545 / {variant.index}
          </span>
        </div>

        <div className="study-feedback" aria-live="polite" aria-atomic="true">
          <span className={actionCount > 0 ? 'feedback-dot feedback-dot--active' : 'feedback-dot'} />
          <span>
            {actionCount > 0
              ? `Interaction registered · ${String(actionCount).padStart(2, '0')}`
              : 'Press the button to test the interaction'}
          </span>
        </div>
        <p className="study-note">{material.note}</p>
      </div>
    </article>
  )
}
