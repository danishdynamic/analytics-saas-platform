"""ALEMBIC migration script template."""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '${up_revision}'
down_revision = ${down_revision | none}
branch_labels = ${branch_labels | none}
depends_on = ${depends_on | none}


def upgrade():
    pass


def downgrade():
    pass
