import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/api/chat').methods({
  POST: async ({ request }) => {
    try {
      const { message } = await request.json()

      if (!message || typeof message !== 'string') {
        return Response.json({ error: 'رسالة غير صالحة' }, { status: 400 })
      }

      // Use Netlify AI Gateway (Anthropic)
      const gatewayBase = process.env.ANTHROPIC_BASE_URL
      const apiKey = process.env.ANTHROPIC_API_KEY

      if (!gatewayBase || !apiKey) {
        // Fallback: local keyword-based response
        return Response.json({ response: getFallbackResponse(message) })
      }

      const systemPrompt = `أنت مساعد طبي ذكي في مجمع الشفاء الطبي. مهمتك مساعدة المرضى والزوار بالإجابة على استفساراتهم.

معلومات المجمع:
- الاسم: مجمع الشفاء الطبي (Al-Shifa Medical Complex)
- الموقع: شارع الملك فهد، حي العليا، الرياض
- الهاتف: 920-001-234
- ساعات العمل: السبت - الخميس 8ص - 10م، الجمعة 2م - 9م
- الأقسام: الطب الباطني، طب الأسنان، طب الأطفال، جراحة العظام، طب الجلدية، الأشعة التشخيصية

قواعد الإجابة:
1. أجب دائماً باللغة العربية
2. كن ودوداً ومهنياً
3. قدم معلومات دقيقة عن المجمع وخدماته
4. للحجز: وجّه المريض لصفحة الحجز أو رقم الهاتف
5. لا تقدم تشخيصاً طبياً محدداً، وأحل المريض للطبيب المختص
6. أجب بإيجاز ووضوح (3-4 جمل كحد أقصى)
7. إذا سأل عن تخصص معين، اذكر الأطباء المتاحين في ذلك القسم`

      const response = await fetch(`${gatewayBase}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5',
          max_tokens: 500,
          system: systemPrompt,
          messages: [{ role: 'user', content: message }],
        }),
      })

      if (!response.ok) {
        return Response.json({ response: getFallbackResponse(message) })
      }

      const data = await response.json()
      const text = data.content?.[0]?.text || getFallbackResponse(message)
      return Response.json({ response: text })
    } catch {
      return Response.json({ response: getFallbackResponse('') })
    }
  },
})

function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase()

  if (msg.includes('ساعات') || msg.includes('وقت') || msg.includes('يفتح')) {
    return 'يعمل مجمع الشفاء الطبي من السبت إلى الخميس من الساعة 8 صباحاً حتى 10 مساءً، وأيام الجمعة من 2 مساءً حتى 9 مساءً. 🕐'
  }
  if (msg.includes('حجز') || msg.includes('موعد') || msg.includes('appointment')) {
    return 'يمكنك حجز موعدك من خلال صفحة الحجز في الموقع، أو الاتصال على الرقم 920-001-234. يسعدنا خدمتك! 📅'
  }
  if (msg.includes('أين') || msg.includes('موقع') || msg.includes('عنوان')) {
    return 'يقع مجمع الشفاء الطبي في شارع الملك فهد، حي العليا، الرياض. يمكنك الاتصال على 920-001-234 للحصول على توجيهات دقيقة. 📍'
  }
  if (msg.includes('تخصص') || msg.includes('قسم') || msg.includes('أقسام')) {
    return 'يضم المجمع 6 أقسام متخصصة: الطب الباطني، طب الأسنان، طب الأطفال، جراحة العظام، طب الجلدية، والأشعة التشخيصية. يمكنك الاطلاع على صفحة الأقسام للمزيد. 🏥'
  }
  if (msg.includes('هاتف') || msg.includes('تواصل') || msg.includes('اتصال') || msg.includes('رقم')) {
    return 'للتواصل مع مجمع الشفاء الطبي، يرجى الاتصال على الرقم: 920-001-234 أو إرسال رسالة عبر واتساب. 📞'
  }
  if (msg.includes('أسنان') || msg.includes('dentis')) {
    return 'قسم طب الأسنان يقدم خدمات متكاملة تشمل: التنظيف، الحشوات التجميلية، تقويم الأسنان، الزراعة، والتبييض. لحجز موعد اتصل على 920-001-234. 🦷'
  }
  if (msg.includes('أطفال') || msg.includes('طفل') || msg.includes('رضيع')) {
    return 'قسم طب الأطفال يقدم رعاية شاملة للأطفال من الولادة حتى سن 18، يشمل التطعيمات ومتابعة النمو وعلاج الأمراض. 👶'
  }

  return 'مرحباً! يسعدني مساعدتك. مجمع الشفاء الطبي يقدم خدمات طبية شاملة. للاستفسار أو الحجز اتصل على 920-001-234 أو احجز عبر الموقع. هل تحتاج معلومات عن قسم معين؟ 🏥'
}
