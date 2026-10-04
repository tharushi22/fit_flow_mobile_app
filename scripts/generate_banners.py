import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

PROMO_DIR = r"D:\FitFlow\store_assets\promotional"
BANNERS_DIR = r"D:\FitFlow\store_assets\banners"
GRAPHICS_DIR = r"D:\FitFlow\store_assets\graphics"
os.makedirs(PROMO_DIR, exist_ok=True)
os.makedirs(BANNERS_DIR, exist_ok=True)
os.makedirs(GRAPHICS_DIR, exist_ok=True)

LOGO_PATH = r"D:\FitFlow\assets\images\logo.png"
SCREENSHOT_HOME = r"D:\FitFlow\store_assets\screenshots\phone\02_home_dashboard.png"
SCREENSHOT_WORKOUT = r"D:\FitFlow\store_assets\screenshots\phone\03_ai_workout_splits.png"

FONT_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_REG = r"C:\Windows\Fonts\segoeui.ttf"
FONT_SEMIBOLD = r"C:\Windows\Fonts\seguisb.ttf"

def make_phone_mockup(screenshot_path, phone_height=420, corner_radius=22, bezel=7):
    """
    Renders a sleek smartphone device frame with screen content and realistic drop shadow.
    """
    screen_h = phone_height - (bezel * 2)
    aspect = 1080.0 / 2400.0
    screen_w = int(screen_h * aspect)
    phone_w = screen_w + (bezel * 2)

    # 1. Prepare Screen
    raw_screen = Image.open(screenshot_path).convert("RGBA")
    screen_resized = raw_screen.resize((screen_w, screen_h), Image.Resampling.LANCZOS)

    # Screen mask with rounded inner corners
    inner_rad = max(4, corner_radius - bezel)
    screen_mask = Image.new("L", (screen_w, screen_h), 0)
    s_draw = ImageDraw.Draw(screen_mask)
    s_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=inner_rad, fill=255)

    # 2. Outer Phone Body
    phone = Image.new("RGBA", (phone_w, phone_height), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(phone)
    # Phone border / casing
    p_draw.rounded_rectangle([0, 0, phone_w, phone_height], radius=corner_radius, fill=(15, 23, 42, 255), outline=(100, 116, 139, 255), width=2)

    # Paste rounded screen
    phone.paste(screen_resized, (bezel, bezel), screen_mask)

    # Camera punch hole
    cam_rad = 5
    cam_x = phone_w // 2
    cam_y = bezel + 10
    p_draw.ellipse([cam_x - cam_rad, cam_y - cam_rad, cam_x + cam_rad, cam_y + cam_rad], fill=(10, 15, 25, 255), outline=(50, 60, 80, 255), width=1)

    # Outer glare / sheen on edge
    p_draw.rounded_rectangle([1, 1, phone_w-1, phone_height-1], radius=corner_radius, outline=(255, 255, 255, 30), width=1)

    # 3. Create Drop Shadow
    pad = 30
    total_w = phone_w + pad * 2
    total_h = phone_height + pad * 2
    canvas = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))

    shadow = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shadow)
    sh_draw.rounded_rectangle([pad + 4, pad + 10, pad + phone_w + 4, pad + phone_height + 10], radius=corner_radius, fill=(0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))

    canvas.paste(shadow, (0, 0), shadow)
    canvas.paste(phone, (pad, pad), phone)

    return canvas, phone_w, phone_height

def draw_play_icon(draw, x, y, size=24):
    """Draws a clean stylized Google Play colorful triangle"""
    # 4 colored segments
    p1 = (x, y)
    p2 = (x + size, y + size // 2)
    p3 = (x, y + size)
    top_mid = (x + int(size * 0.6), y + int(size * 0.2))
    bot_mid = (x + int(size * 0.6), y + int(size * 0.8))

    draw.polygon([p1, (x + int(size*0.7), y + size//2), p3], fill=(0, 204, 255))
    draw.polygon([p1, p2, top_mid], fill=(0, 230, 138))
    draw.polygon([p3, p2, bot_mid], fill=(255, 60, 80))
    draw.polygon([top_mid, p2, bot_mid], fill=(255, 186, 0))

def draw_apple_icon(draw, x, y, size=22):
    """Draws a clean white Apple silhouette outline"""
    r = size // 2
    draw.ellipse([x, y + 4, x + r*2 - 2, y + size], fill=(255, 255, 255))
    # Leaf
    draw.ellipse([x + r - 2, y, x + r + 4, y + 6], fill=(255, 255, 255))

def create_store_banner_1024x500():
    w, h = 1024, 500
    base = Image.new("RGBA", (w, h), (11, 15, 26, 255))

    # Dynamic Radial Glows
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([-80, -80, 520, 520], fill=(124, 58, 237, 75))    # Indigo glow top-left
    g_draw.ellipse([550, 40, 1100, 580], fill=(37, 99, 235, 70))     # Royal Blue glow right
    g_draw.ellipse([200, 250, 700, 700], fill=(16, 185, 129, 35))    # Emerald fitness glow center
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    base = Image.alpha_composite(base, glow)

    draw = ImageDraw.Draw(base)

    # Modern Grid Pattern
    for gx in range(0, w, 70):
        draw.line([(gx, 0), (gx, h)], fill=(255, 255, 255, 8), width=1)
    for gy in range(0, h, 70):
        draw.line([(0, gy), (w, gy)], fill=(255, 255, 255, 8), width=1)

    # 1. Branding: Circular Logo Card
    if os.path.exists(LOGO_PATH):
        logo_raw = Image.open(LOGO_PATH).convert("RGBA")
        card_size = 100
        card = Image.new("RGBA", (card_size, card_size), (0, 0, 0, 0))
        c_draw = ImageDraw.Draw(card)
        c_draw.ellipse([0, 0, card_size, card_size], fill=(255, 255, 255, 245), outline=(210, 225, 255, 255), width=3)
        logo_res = logo_raw.resize((72, 72), Image.Resampling.LANCZOS)
        card.paste(logo_res, (14, 14), logo_res)
        base.paste(card, (55, 45), card)

    # Header Badge next to logo
    badge_x = 175
    draw.rounded_rectangle([badge_x, 50, badge_x + 280, 80], radius=15, fill=(124, 58, 237, 70), outline=(167, 139, 250, 180), width=1)
    # small cyan dot
    draw.ellipse([badge_x + 14, 62, badge_x + 22, 70], fill=(56, 189, 248))
    draw.text((badge_x + 30, 56), "AI-POWERED FITNESS PLATFORM", font=ImageFont.truetype(FONT_BOLD, 12), fill=(224, 231, 255))

    # App Title & Version
    draw.text((badge_x, 90), "FITFLOW", font=ImageFont.truetype(FONT_BOLD, 46), fill=(255, 255, 255))
    draw.text((badge_x + 215, 115), "v1.0.1", font=ImageFont.truetype(FONT_BOLD, 15), fill=(96, 165, 250))

    # Gradient line
    draw.rectangle([55, 160, 200, 164], fill=(59, 130, 246))
    draw.rectangle([205, 160, 480, 164], fill=(124, 58, 237))

    # Tagline & Description
    draw.text((55, 180), "Transform Your Routine With Intelligent Training", font=ImageFont.truetype(FONT_SEMIBOLD, 18), fill=(241, 245, 249))
    draw.text((55, 210), "Personalized Workout Splits  |  Macro Tracking  |  Live Analytics", font=ImageFont.truetype(FONT_REG, 15), fill=(203, 213, 225))
    draw.text((55, 235), "Engineered for sustainable strength & peak body conditioning.", font=ImageFont.truetype(FONT_REG, 13), fill=(148, 163, 184))

    # Feature Pills (Clean icons & text, NO broken emoji boxes)
    pills = [
        ("AI Workout Splits", (30, 58, 138), (96, 165, 250), (56, 189, 248)),
        ("Nutrition & Macros", (20, 83, 45), (74, 222, 128), (52, 211, 153)),
        ("Volume Analytics", (88, 28, 135), (192, 132, 252), (216, 180, 254)),
        ("Community Feed", (124, 45, 18), (251, 146, 60), (251, 146, 60)),
    ]
    px = 55
    py = 275
    font_pill = ImageFont.truetype(FONT_BOLD, 12)
    for label, bg, border, dot_color in pills:
        tw = int(draw.textlength(label, font=font_pill))
        bw = tw + 38
        draw.rounded_rectangle([px, py, px + bw, py + 32], radius=10, fill=bg, outline=border, width=1)
        draw.ellipse([px + 12, py + 12, px + 20, py + 20], fill=dot_color)
        draw.text((px + 26, py + 8), label, font=font_pill, fill=(255, 255, 255))
        px += bw + 10

    # Store Accreditation Badges
    bx = 55
    by = 335
    # Google Play Button
    draw.rounded_rectangle([bx, by, bx + 175, by + 52], radius=10, fill=(30, 41, 59, 230), outline=(71, 85, 105), width=1)
    draw_play_icon(draw, bx + 16, by + 14, size=24)
    draw.text((bx + 48, by + 9), "GET IT ON", font=ImageFont.truetype(FONT_REG, 9), fill=(148, 163, 184))
    draw.text((bx + 48, by + 21), "Google Play", font=ImageFont.truetype(FONT_BOLD, 16), fill=(255, 255, 255))

    # Apple App Store Button
    bx += 190
    draw.rounded_rectangle([bx, by, bx + 175, by + 52], radius=10, fill=(30, 41, 59, 230), outline=(71, 85, 105), width=1)
    draw_apple_icon(draw, bx + 16, by + 14, size=22)
    draw.text((bx + 46, by + 9), "Download on the", font=ImageFont.truetype(FONT_REG, 9), fill=(148, 163, 184))
    draw.text((bx + 46, by + 21), "App Store", font=ImageFont.truetype(FONT_BOLD, 16), fill=(255, 255, 255))

    # Rating badge
    bx += 190
    draw.rounded_rectangle([bx, by, bx + 95, by + 52], radius=10, fill=(15, 23, 42, 230), outline=(51, 65, 85), width=1)
    draw.text((bx + 14, by + 10), "CONTENT", font=ImageFont.truetype(FONT_REG, 8), fill=(148, 163, 184))
    draw.text((bx + 14, by + 23), "Rated 3+", font=ImageFont.truetype(FONT_BOLD, 14), fill=(74, 222, 128))

    # Official standard footer note
    draw.text((55, h - 35), "FitFlow v1.0.1  |  Official Google Play Feature Graphic (1024 x 500)  |  SLIIT IT3060", font=ImageFont.truetype(FONT_REG, 11), fill=(100, 116, 139))

    # 2. Right Side: Dual Sleek Smartphone Mockups showing actual screens!
    if os.path.exists(SCREENSHOT_WORKOUT):
        phone_canvas2, pw2, ph2 = make_phone_mockup(SCREENSHOT_WORKOUT, phone_height=380, corner_radius=20, bezel=6)
        # Background slightly offset phone
        base.paste(phone_canvas2, (800 - 30, 60 - 30), phone_canvas2)

    if os.path.exists(SCREENSHOT_HOME):
        phone_canvas1, pw1, ph1 = make_phone_mockup(SCREENSHOT_HOME, phone_height=430, corner_radius=22, bezel=6)
        # Foreground dominant phone
        base.paste(phone_canvas1, (670 - 30, 35 - 30), phone_canvas1)

    # Convert to RGB & Save to all target locations
    final_rgb = Image.new("RGB", (w, h), (11, 15, 26))
    final_rgb.paste(base, (0, 0), base)

    p1 = os.path.join(PROMO_DIR, "store_promotional_banner_1024x500.png")
    p2 = os.path.join(BANNERS_DIR, "fitflow_store_banner_1024x500.png")
    p3 = os.path.join(GRAPHICS_DIR, "feature_graphic_1024x500.png")
    final_rgb.save(p1, quality=98)
    final_rgb.save(p2, quality=98)
    final_rgb.save(p3, quality=98)
    print("Saved 1024x500 Store Promotional Feature Banner!")

def create_social_banner_1200x630():
    w, h = 1200, 630
    base = Image.new("RGBA", (w, h), (11, 15, 26, 255))

    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([-100, -100, 650, 650], fill=(124, 58, 237, 85))
    g_draw.ellipse([650, 50, 1300, 700], fill=(37, 99, 235, 75))
    glow = glow.filter(ImageFilter.GaussianBlur(100))
    base = Image.alpha_composite(base, glow)

    draw = ImageDraw.Draw(base)

    # Grid
    for gx in range(0, w, 80):
        draw.line([(gx, 0), (gx, h)], fill=(255, 255, 255, 8), width=1)
    for gy in range(0, h, 80):
        draw.line([(0, gy), (w, gy)], fill=(255, 255, 255, 8), width=1)

    # Logo Card
    if os.path.exists(LOGO_PATH):
        logo_raw = Image.open(LOGO_PATH).convert("RGBA")
        card_size = 120
        card = Image.new("RGBA", (card_size, card_size), (0, 0, 0, 0))
        c_draw = ImageDraw.Draw(card)
        c_draw.ellipse([0, 0, card_size, card_size], fill=(255, 255, 255, 245), outline=(210, 225, 255, 255), width=4)
        logo_res = logo_raw.resize((86, 86), Image.Resampling.LANCZOS)
        card.paste(logo_res, (17, 17), logo_res)
        base.paste(card, (70, 60), card)

    badge_x = 215
    draw.rounded_rectangle([badge_x, 65, badge_x + 310, 98], radius=16, fill=(124, 58, 237, 75), outline=(167, 139, 250, 180), width=1)
    draw.ellipse([badge_x + 16, 78, badge_x + 24, 86], fill=(56, 189, 248))
    draw.text((badge_x + 34, 71), "NEXT-GEN FITNESS COMPANION", font=ImageFont.truetype(FONT_BOLD, 13), fill=(224, 231, 255))

    draw.text((badge_x, 110), "FITFLOW", font=ImageFont.truetype(FONT_BOLD, 54), fill=(255, 255, 255))
    draw.text((badge_x + 250, 138), "v1.0.1", font=ImageFont.truetype(FONT_BOLD, 16), fill=(96, 165, 250))

    draw.rectangle([70, 195, 240, 200], fill=(59, 130, 246))
    draw.rectangle([245, 195, 550, 200], fill=(124, 58, 237))

    draw.text((70, 220), "Level Up Your Fitness With AI-Driven Workouts", font=ImageFont.truetype(FONT_SEMIBOLD, 22), fill=(241, 245, 249))
    draw.text((70, 258), "Track workouts, calories, and body metrics with precision and speed.", font=ImageFont.truetype(FONT_REG, 17), fill=(203, 213, 225))
    draw.text((70, 288), "Built with React Native & Expo for smooth 60 FPS mobile performance.", font=ImageFont.truetype(FONT_REG, 15), fill=(148, 163, 184))

    # Feature Pills
    pills = [
        ("AI Workout Splits", (30, 58, 138), (96, 165, 250), (56, 189, 248)),
        ("Macro Tracker", (20, 83, 45), (74, 222, 128), (52, 211, 153)),
        ("Progress Analytics", (88, 28, 135), (192, 132, 252), (216, 180, 254)),
        ("Community Feed", (124, 45, 18), (251, 146, 60), (251, 146, 60)),
    ]
    px = 70
    py = 345
    font_pill = ImageFont.truetype(FONT_BOLD, 13)
    for label, bg, border, dot_color in pills:
        tw = int(draw.textlength(label, font=font_pill))
        bw = tw + 42
        draw.rounded_rectangle([px, py, px + bw, py + 36], radius=11, fill=bg, outline=border, width=1)
        draw.ellipse([px + 14, py + 14, px + 22, py + 22], fill=dot_color)
        draw.text((px + 28, py + 9), label, font=font_pill, fill=(255, 255, 255))
        px += bw + 12

    # Store Badges
    bx = 70
    by = 425
    draw.rounded_rectangle([bx, by, bx + 195, by + 58], radius=12, fill=(30, 41, 59, 230), outline=(71, 85, 105), width=1)
    draw_play_icon(draw, bx + 18, by + 16, size=26)
    draw.text((bx + 54, by + 11), "GET IT ON", font=ImageFont.truetype(FONT_REG, 10), fill=(148, 163, 184))
    draw.text((bx + 54, by + 24), "Google Play", font=ImageFont.truetype(FONT_BOLD, 18), fill=(255, 255, 255))

    bx += 215
    draw.rounded_rectangle([bx, by, bx + 195, by + 58], radius=12, fill=(30, 41, 59, 230), outline=(71, 85, 105), width=1)
    draw_apple_icon(draw, bx + 18, by + 16, size=24)
    draw.text((bx + 52, by + 11), "Download on the", font=ImageFont.truetype(FONT_REG, 10), fill=(148, 163, 184))
    draw.text((bx + 52, by + 24), "App Store", font=ImageFont.truetype(FONT_BOLD, 18), fill=(255, 255, 255))

    draw.text((70, h - 45), "FitFlow Promotional Banner (1200 x 630)  |  Social Media & Web Display  |  SLIIT IT3060", font=ImageFont.truetype(FONT_REG, 12), fill=(100, 116, 139))

    # Dual Phones Right Side
    if os.path.exists(SCREENSHOT_WORKOUT):
        phone_canvas2, pw2, ph2 = make_phone_mockup(SCREENSHOT_WORKOUT, phone_height=490, corner_radius=24, bezel=7)
        base.paste(phone_canvas2, (950 - 30, 75 - 30), phone_canvas2)

    if os.path.exists(SCREENSHOT_HOME):
        phone_canvas1, pw1, ph1 = make_phone_mockup(SCREENSHOT_HOME, phone_height=540, corner_radius=26, bezel=7)
        base.paste(phone_canvas1, (780 - 30, 45 - 30), phone_canvas1)

    final_rgb = Image.new("RGB", (w, h), (11, 15, 26))
    final_rgb.paste(base, (0, 0), base)

    p1 = os.path.join(PROMO_DIR, "social_promo_banner_1200x630.png")
    p2 = os.path.join(BANNERS_DIR, "fitflow_social_promo_1200x630.png")
    final_rgb.save(p1, quality=98)
    final_rgb.save(p2, quality=98)
    print("Saved 1200x630 Social Promotional Banner!")

def create_square_banner_1080x1080():
    w, h = 1080, 1080
    base = Image.new("RGBA", (w, h), (11, 15, 26, 255))

    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([200, 50, 880, 750], fill=(124, 58, 237, 80))
    g_draw.ellipse([100, 550, 980, 1150], fill=(37, 99, 235, 65))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    base = Image.alpha_composite(base, glow)

    draw = ImageDraw.Draw(base)

    # Grid
    for gx in range(0, w, 90):
        draw.line([(gx, 0), (gx, h)], fill=(255, 255, 255, 8), width=1)
    for gy in range(0, h, 90):
        draw.line([(0, gy), (w, gy)], fill=(255, 255, 255, 8), width=1)

    # Top Brand Header
    if os.path.exists(LOGO_PATH):
        logo_raw = Image.open(LOGO_PATH).convert("RGBA")
        card_size = 90
        card = Image.new("RGBA", (card_size, card_size), (0, 0, 0, 0))
        c_draw = ImageDraw.Draw(card)
        c_draw.ellipse([0, 0, card_size, card_size], fill=(255, 255, 255, 245), outline=(210, 225, 255, 255), width=3)
        logo_res = logo_raw.resize((65, 65), Image.Resampling.LANCZOS)
        card.paste(logo_res, (13, 13), logo_res)
        base.paste(card, (w//2 - card_size//2, 40), card)

    title_text = "FITFLOW"
    tw = draw.textlength(title_text, font=ImageFont.truetype(FONT_BOLD, 42))
    draw.text((w//2 - tw//2, 140), title_text, font=ImageFont.truetype(FONT_BOLD, 42), fill=(255, 255, 255))

    sub_text = "Your Smart AI Fitness Companion"
    sw = draw.textlength(sub_text, font=ImageFont.truetype(FONT_SEMIBOLD, 20))
    draw.text((w//2 - sw//2, 195), sub_text, font=ImageFont.truetype(FONT_SEMIBOLD, 20), fill=(147, 197, 253))

    # Center Dual Smartphone Showcase
    if os.path.exists(SCREENSHOT_WORKOUT):
        phone_canvas2, pw2, ph2 = make_phone_mockup(SCREENSHOT_WORKOUT, phone_height=490, corner_radius=24, bezel=7)
        base.paste(phone_canvas2, (560 - 30, 245 - 30), phone_canvas2)

    if os.path.exists(SCREENSHOT_HOME):
        phone_canvas1, pw1, ph1 = make_phone_mockup(SCREENSHOT_HOME, phone_height=530, corner_radius=26, bezel=7)
        base.paste(phone_canvas1, (300 - 30, 225 - 30), phone_canvas1)

    # Bottom Features Centered
    pills = [
        ("AI Splits", (30, 58, 138), (96, 165, 250)),
        ("Macro Log", (20, 83, 45), (74, 222, 128)),
        ("Analytics", (88, 28, 135), (192, 132, 252)),
        ("Community", (124, 45, 18), (251, 146, 60)),
    ]
    font_pill = ImageFont.truetype(FONT_BOLD, 15)
    total_pill_w = sum(int(draw.textlength(label, font=font_pill)) + 36 for label, _, _ in pills) + 15 * (len(pills) - 1)
    px = (w - total_pill_w) // 2
    py = 830
    for label, bg, border in pills:
        tw = int(draw.textlength(label, font=font_pill))
        bw = tw + 36
        draw.rounded_rectangle([px, py, px + bw, py + 42], radius=12, fill=bg, outline=border, width=1)
        draw.text((px + 18, py + 11), label, font=font_pill, fill=(255, 255, 255))
        px += bw + 15

    # Download Badges Center
    total_badge_w = 195 * 2 + 25
    bx = (w - total_badge_w) // 2
    by = 910
    draw.rounded_rectangle([bx, by, bx + 195, by + 56], radius=12, fill=(30, 41, 59, 230), outline=(71, 85, 105), width=1)
    draw_play_icon(draw, bx + 18, by + 15, size=26)
    draw.text((bx + 54, by + 10), "GET IT ON", font=ImageFont.truetype(FONT_REG, 10), fill=(148, 163, 184))
    draw.text((bx + 54, by + 23), "Google Play", font=ImageFont.truetype(FONT_BOLD, 18), fill=(255, 255, 255))

    bx += 220
    draw.rounded_rectangle([bx, by, bx + 195, by + 56], radius=12, fill=(30, 41, 59, 230), outline=(71, 85, 105), width=1)
    draw_apple_icon(draw, bx + 18, by + 15, size=24)
    draw.text((bx + 52, by + 10), "Download on the", font=ImageFont.truetype(FONT_REG, 10), fill=(148, 163, 184))
    draw.text((bx + 52, by + 23), "App Store", font=ImageFont.truetype(FONT_BOLD, 18), fill=(255, 255, 255))

    footer_text = "FitFlow Square Promotional Banner (1080 x 1080)  •  Available on Android & iOS"
    fw = draw.textlength(footer_text, font=ImageFont.truetype(FONT_REG, 13))
    draw.text((w//2 - fw//2, 1020), footer_text, font=ImageFont.truetype(FONT_REG, 13), fill=(100, 116, 139))

    final_rgb = Image.new("RGB", (w, h), (11, 15, 26))
    final_rgb.paste(base, (0, 0), base)

    p1 = os.path.join(PROMO_DIR, "square_promo_banner_1080x1080.png")
    p2 = os.path.join(BANNERS_DIR, "fitflow_square_banner_1080x1080.png")
    final_rgb.save(p1, quality=98)
    final_rgb.save(p2, quality=98)
    print("Saved 1080x1080 Square Promotional Banner!")

if __name__ == "__main__":
    create_store_banner_1024x500()
    create_social_banner_1200x630()
    create_square_banner_1080x1080()
    print("ALL BANNERS GENERATED SUCCESSFULLY!")
