import { RouterBtn } from '@/app/components/router-btn'

export default function NotFound() {
  return (
    <div className="my-6">
      Blog Detail Not Found
      <div className='mt-10'>
        <RouterBtn destination="blogs" />
      </div>
    </div>
  )
}
