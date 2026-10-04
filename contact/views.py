from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage

def home(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject', 'New Portfolio Contact Message')
        message = request.POST.get('message')

        if name and email and message:
            # Save to database
            contact_msg = ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )

            # Send email
            email_body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
            try:
                send_mail(
                    subject=f"Portfolio Contact: {subject}",
                    message=email_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER], # Send to yourself
                    fail_silently=False,
                )
                messages.success(request, "Thank you! Your message has been sent successfully.")
            except Exception as e:
                messages.error(request, "Your message was saved, but there was an error sending the email. We will get back to you soon.")
            
            return redirect('home')
        else:
            messages.error(request, "Please fill out all required fields.")
            return redirect('home')

    return render(request, 'index.html')
