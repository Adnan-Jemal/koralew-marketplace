import DeleteAccount from '@/components/profile/DeleteAccount'
import ProfileForm from '@/components/profile/ProfileForm'
import ProfileView from '@/components/profile/ProfileView'
export default function page() {
  return (
    <div className="w-[90%] mx-auto flex flex-col  gap-14  my-10">
    <ProfileView />

      <ProfileForm />
   

    <DeleteAccount />
  </div>
  )
}
