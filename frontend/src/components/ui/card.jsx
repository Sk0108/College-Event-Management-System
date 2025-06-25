export default function CourselCard({ description, title, image }) {
    return (
        <div className="card" style={{
            minWidth: '30vw',
            height: '30vh',
            overflow: 'hidden',
            margin: 0,
            display: 'flex',
            padding: 0,
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
            <img src={image} className="card-img-top" alt={title} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
            }} />
        </div>
    
)}