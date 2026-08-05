
:root {
  --bg:#0f0f13;
  --panel:#17171f;
  --panel-2:#20202a;
  --text:#fff;
  --muted:#a6a6b2;
  --accent:#7c3aed;
  --accent-2:#a855f7;
  --border:rgba(255,255,255,.09);
  --radius:20px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:Poppins,Arial,sans-serif}
button,input,textarea{font:inherit}
button{cursor:pointer}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid rgba(168,85,247,.45);outline-offset:3px}
.app{min-height:100vh;display:grid;grid-template-columns:230px minmax(0,1fr) 310px}
.sidebar,.player-panel{position:sticky;top:0;height:100vh;background:var(--panel);padding:28px 22px}
.sidebar{border-right:1px solid var(--border);display:flex;flex-direction:column}
.logo{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-size:22px;font-weight:700;margin-bottom:38px}
.logo span{width:42px;height:42px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(135deg,var(--accent),var(--accent-2))}
.sidebar nav{display:grid;gap:8px}
.nav-btn{border:0;background:transparent;color:var(--muted);border-radius:13px;padding:13px 15px;text-align:left;font-weight:500}
.nav-btn:hover,.nav-btn.active{color:#fff;background:linear-gradient(90deg,rgba(124,58,237,.25),transparent)}
.side-card{margin-top:auto;padding:18px;border-radius:18px;background:linear-gradient(145deg,rgba(124,58,237,.28),rgba(168,85,247,.08));border:1px solid rgba(168,85,247,.25)}
.side-card h3{margin:7px 0 5px}.side-card p{font-size:13px;color:var(--muted)}
main{min-width:0;padding:30px clamp(22px,4vw,52px) 130px}
.topbar,.section-title,.split{display:flex;justify-content:space-between;align-items:center;gap:16px}
.topbar{margin-bottom:28px}.topbar h1{font-size:clamp(24px,3vw,34px);margin:5px 0}
small{color:var(--accent-2);font-weight:700;letter-spacing:.12em}
.avatar{width:46px;height:46px;border-radius:50%;border:1px solid var(--border);background:var(--panel-2);color:#fff;font-weight:700}
.view{display:none;animation:fade .25s ease}.view.active{display:block}
@keyframes fade{from{opacity:.3;transform:translateY(5px)}}
.hero{min-height:300px;border-radius:30px;padding:clamp(28px,5vw,50px);display:flex;align-items:center;justify-content:space-between;overflow:hidden;background:linear-gradient(120deg,#4c1d95,#7c3aed 48%,#a855f7);box-shadow:0 20px 55px rgba(0,0,0,.28)}
.hero h2{font-size:clamp(42px,6vw,68px);line-height:1;margin:18px 0 12px}.hero p{color:rgba(255,255,255,.82)}
.tag{display:inline-block;background:rgba(255,255,255,.14);padding:8px 12px;border-radius:999px;font-size:12px;font-weight:600}
.record{width:210px;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#d8b4fe 0 8%,#4c1d95 9% 18%,#111 19% 22%,transparent 23%),repeating-radial-gradient(circle,#151515 0 8px,#292929 9px 11px);box-shadow:0 30px 65px rgba(0,0,0,.35)}
.primary-btn,.secondary-btn,.text-btn,.filter-btn{border:0;border-radius:13px;padding:12px 17px;font-weight:600}
.primary-btn{background:#fff;color:#27143e}.secondary-btn{background:rgba(255,255,255,.12);color:#fff;width:100%}.text-btn{background:transparent;color:var(--accent-2)}.filter-btn{background:var(--panel-2);color:var(--muted)}.filter-btn.active{background:var(--accent);color:#fff}
.section{margin-top:38px}.section-title h2{font-size:22px}.song-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.song-card,.track,.settings-card,.stats article,.playlist-card{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius)}
.song-card{padding:14px;transition:.2s transform}.song-card:hover{transform:translateY(-4px)}
.cover{height:170px;border-radius:16px;display:grid;place-items:center;font-size:35px;font-weight:700;margin-bottom:14px}
.song-card h3,.track h3{margin:0;font-size:16px}.song-card p,.track p,.profile-header p{margin:4px 0 0;color:var(--muted);font-size:13px}
.song-actions{display:flex;justify-content:space-between;align-items:center;margin-top:13px}.icon-btn{border:0;background:var(--panel-2);color:#fff;width:37px;height:37px;border-radius:50%}.icon-btn.liked{background:var(--accent)}
.purple{background:linear-gradient(135deg,#7c3aed,#c084fc)}.orange{background:linear-gradient(135deg,#f97316,#facc15)}.pink{background:linear-gradient(135deg,#db2777,#fb7185)}.blue{background:linear-gradient(135deg,#2563eb,#38bdf8)}.teal{background:linear-gradient(135deg,#0f766e,#2dd4bf)}.green{background:linear-gradient(135deg,#15803d,#86efac)}
.mood-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.mood{min-height:110px;border:0;border-radius:18px;color:#fff;font-weight:700;font-size:18px;text-align:left;padding:18px}
.page-heading h2{font-size:38px;margin:5px 0 24px}.search-form{display:flex;gap:12px}.search-form input{flex:1;background:var(--panel);border:1px solid var(--border);color:#fff;border-radius:15px;padding:15px}
.filter-row,.library-controls{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0}
.track-list{display:grid;gap:10px}.track{padding:12px 14px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:13px}
.mini-cover{width:48px;height:48px;border-radius:12px;display:grid;place-items:center;font-weight:700}.track-actions{display:flex;gap:8px}
.playlist-container{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-bottom:18px}.playlist-card{padding:18px}.playlist-card h3{margin:0 0 6px}.playlist-card p{color:var(--muted);font-size:13px}
.profile-header{display:flex;align-items:center;gap:20px;padding:30px;border-radius:25px;background:linear-gradient(120deg,#312e81,#7c3aed)}.profile-header h2{margin:6px 0;font-size:32px}.profile-avatar{width:90px;height:90px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.16);font-size:28px;font-weight:700}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:20px 0}.stats article{padding:22px}.stats strong{display:block;font-size:27px}.stats span{color:var(--muted);font-size:13px}
.settings-card{padding:22px}.settings-card label{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--border)}.settings-card .primary-btn{margin-top:18px}
.player-panel{border-left:1px solid var(--border);text-align:center}.player-panel .cover{height:auto;aspect-ratio:1;margin-top:30px}.player-panel h2{margin:18px 0 5px}.player-panel p{color:var(--muted);margin-top:0}
#progress{width:100%;accent-color:var(--accent-2)}.time{display:flex;justify-content:space-between;color:var(--muted);font-size:12px}
.controls{display:flex;justify-content:center;align-items:center;gap:16px;margin:24px 0}.controls button{border:0;background:transparent;color:#fff;font-size:19px}.controls .play-btn{width:58px;height:58px;border-radius:50%;background:#fff;color:#27143e}
.volume{display:flex;gap:10px;align-items:center}.volume input{width:100%;accent-color:var(--accent)}
dialog{border:1px solid var(--border);background:var(--panel);color:#fff;border-radius:22px;width:min(460px,90vw);padding:0}dialog::backdrop{background:rgba(0,0,0,.65)}
#playlist-form{padding:24px}.modal-heading{display:flex;justify-content:space-between;align-items:center}.modal-heading button{border:0;background:transparent;color:#fff;font-size:28px}#playlist-form label{display:grid;gap:7px;margin:15px 0}#playlist-form input,#playlist-form textarea{background:var(--panel-2);border:1px solid var(--border);color:#fff;border-radius:12px;padding:12px}
.toast{position:fixed;right:25px;bottom:25px;background:#fff;color:#18111f;padding:12px 18px;border-radius:12px;opacity:0;transform:translateY(15px);pointer-events:none;transition:.25s;z-index:10}.toast.show{opacity:1;transform:none}
.mobile-nav,.mobile-player{display:none}
@media(max-width:1100px){.app{grid-template-columns:90px minmax(0,1fr) 280px}.logo{justify-content:center}.logo:not(span){font-size:0}.sidebar .nav-btn span,.side-card{display:none}.sidebar .nav-btn{text-align:center;font-size:20px}.record{width:170px}.song-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:780px){.app{display:block}.sidebar,.player-panel{display:none}main{padding:22px 18px 155px}.topbar h1{font-size:24px}.hero{min-height:270px}.record{display:none}.song-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.mood-grid{grid-template-columns:repeat(2,1fr)}.playlist-container,.stats{grid-template-columns:1fr}.mobile-nav{display:grid;grid-template-columns:repeat(4,1fr);position:fixed;bottom:0;left:0;right:0;background:#17171f;border-top:1px solid var(--border);z-index:8}.mobile-nav .nav-btn{text-align:center;padding:10px 4px;font-size:18px}.mobile-nav span{display:block;font-size:10px}.mobile-player{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;position:fixed;left:10px;right:10px;bottom:66px;background:#24242e;border:1px solid var(--border);border-radius:16px;padding:9px 12px;z-index:8}.mobile-player span{display:block;color:var(--muted);font-size:11px}.mobile-player button{border:0;background:#fff;color:#27143e;width:40px;height:40px;border-radius:50%}.search-form{flex-direction:column}}
@media(max-width:480px){.song-grid{grid-template-columns:1fr}.hero h2{font-size:42px}.profile-header{align-items:flex-start;flex-direction:column}.track{grid-template-columns:auto 1fr}.track-actions{grid-column:1/-1;justify-content:flex-end}}

