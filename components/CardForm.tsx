'use client'
import { useMutation } from 'convex/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { api } from '@/convex/_generated/api'

const CardForm = () => {
    const createCard = useMutation(api.cards.createCard)
    
    return (
        <form className='w-lg' onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const formData = new FormData(form)
            
            const cardData = {
                fullName: formData.get('fullName') as string,
                jobTitle: formData.get('jobTitle') as string,
                company: formData.get('company') as string,
                phone: formData.get('phone') as string,
                email: formData.get('email') as string,
                website: formData.get('website') as string,
                address: formData.get('address') as string,
                twitter: formData.get('twitter') as string,
                linkedin: formData.get('linkedIn') as string,
                github: formData.get('github') as string,
            }
            
            void createCard(cardData)
            form.reset()
        }}>
            <div className="*:not-first:mt-2">
                <Label>Full Name</Label>
                <Input name='fullName' placeholder="Full Name" type="text" required />

                <Label>Job Title</Label>
                <Input name='jobTitle' placeholder="Job Title" type="text" />

                <Label>Company</Label>
                <Input name='company' placeholder="Company" type="text" />

                <Label>Phone</Label>
                <Input name='phone' placeholder="Phone" type="tel" />

                <Label>Email</Label>
                <Input name='email' placeholder="Email" type="email" />

                <Label>Website</Label>
                <Input name='website' placeholder="Website" type="url" />

                <Label>Address</Label>
                <Input name='address' placeholder="Address" type="text" />

                <Label>Twitter</Label>
                <Input name='twitter' placeholder="Twitter" type="url" />

                <Label>LinkedIn</Label>
                <Input name='linkedIn' placeholder="LinkedIn" type="url" />

                <Label>GitHub</Label>
                <Input name='github' placeholder="GitHub" type="url" />
            </div>

            <Button type="submit" className='mt-5'>Submit</Button>
        </form>
    )
}

export default CardForm